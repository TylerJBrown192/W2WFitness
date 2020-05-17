import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../server/entity/User';
import { HttpEntityNotFoundError, HttpError, HttpStatusCode } from '../utils/HttpError';

export class UserDomain {

    // TODO: Need Unit tests for:
    // username, password, firstName, lastName
    // existence (non-null), min length, max length
    public async createUser(user: User): Promise<User> {
        try {
            const mappedUser = plainToClass(User, user);
            console.log('mappedUser', mappedUser);

            const errors = await validate(mappedUser);

            if (errors.length) {
                throw new HttpError(HttpStatusCode.UNPROCESSABLE_ENTITY, `Invalid User model submitted. Errors: ${errors.join('\n')}`);
            }

            const repository = getRepository<User>(User);

            await mappedUser.hashPassword();

            return await repository.save(user);
        } catch (e) {
            // TODO: Test for duplicate email && throw 409:CONFLICT

            // TODO: More detailed error throwing here & logging
            throw e;
        }
    }

    public async login({ email, password }: { email: string, password: string }): Promise<string> {
        if (!email || !password) {
            throw new HttpError(HttpStatusCode.BAD_REQUEST, `Missing Email or Password`);
        }

        try {
            const repository = getRepository<User>(User);

            // TODO: Swap over to findOneOrFail? how does this affect error handling?
            const user = await repository.findOne({ where: { email } });

            if (!user) {
                throw new HttpEntityNotFoundError(HttpStatusCode.NOT_FOUND, User, `User with Email '${email}' not found`);
            }

            // TODO: Verify this the best way to check for password validity
            if (!(await user.checkPasswordValidity(password))) {
                console.log('unauth');
                throw new HttpError(HttpStatusCode.UNAUTHORIZED, `Invalid Password`);
            }

            const jwtSecret = process.env.JWT_SECRET;

            if (!jwtSecret) {
                // TODO: More detailed error throwing here & logging
                // Major yikes somewhere in the build pipeline lmao
                throw new HttpError(HttpStatusCode.SERVICE_UNAVAILABLE, `Login service temporarily unavailable`);
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email },
                jwtSecret,
                { expiresIn: '1s' },
            );

            return token;
        } catch (e) {
            // TODO: More detailed error throwing here & logging
            throw e;
        }
    }


    // login = async (req: Request, res: Response) => {
    //     //Check if username and password are set
    //     let { username, password } = req.body;
    //     if (!(username && password)) {
    //       res.status(400).send();
    //     }

    //     //Get user from database
    //     const userRepository = getRepository(User);
    //     let user: User;
    //     try {
    //       user = await userRepository.findOneOrFail({ where: { username } });
    //     } catch (error) {
    //       res.status(401).send();
    //     }

    //     //Check if encrypted password match
    //     if (!user.checkIfUnencryptedPasswordIsValid(password)) {
    //       res.status(401).send();
    //       return;
    //     }

    //     //Sing JWT, valid for 1 hour
    //     const token = jwt.sign(
    //       { userId: user.id, username: user.username },
    //       config.jwtSecret,
    //       { expiresIn: "1h" }
    //     );

    //     //Send the jwt in the response
    //     res.send(token);
    //   };

    //   changePassword = async (req: Request, res: Response) => {
    //     //Get ID from JWT
    //     const id = res.locals.jwtPayload.userId;

    //     //Get parameters from the body
    //     const { oldPassword, newPassword } = req.body;
    //     if (!(oldPassword && newPassword)) {
    //       res.status(400).send();
    //     }

    //     //Get user from the database
    //     const userRepository = getRepository(User);
    //     let user: User;
    //     try {
    //       user = await userRepository.findOneOrFail(id);
    //     } catch (id) {
    //       res.status(401).send();
    //     }

    //     //Check if old password matchs
    //     if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
    //       res.status(401).send();
    //       return;
    //     }

    //     //Validate de model (password lenght)
    //     user.password = newPassword;
    //     const errors = await validate(user);
    //     if (errors.length > 0) {
    //       res.status(400).send(errors);
    //       return;
    //     }
    //     //Hash the new password and save
    //     user.hashPassword();
    //     userRepository.save(user);

    //     res.status(204).send();
    //   }
}

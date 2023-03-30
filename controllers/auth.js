import User from '../models/User.js';
import ProfileInfo from '../models/ProfileInfo.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { handleError } from '../error.js';

//We want to create a new user and add it to our MongoDb signup port. Below we create our sign up
//async function and take a request.body object that corresponds to our userSchema. Then we hash it.

export const signup = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
      		return res.status(400).json({ message: 'Missing required fields' });
    	}

		// Check if a user with the same email already exists
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(400).json({ message: 'Email already in use' });
		}

		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		const newUser = new User({ ...req.body, password: hash });

		const newUser1 = await newUser.save();

		const newProfileInfo = new ProfileInfo({ user: newUser1._id });
		await newProfileInfo.save();

		// We take the id for the user and have it as our token. We specify the token id in our .env file.
		//Below that we destructure password so as to remove it from json display, just leaving othersData.
		const token = jwt.sign({ id: newUser._id }, process.env.JWT);

		const { password: userPassword, ...othersData } = newUser._doc;
		// We save the user and connect them to a token, which we then send to our browser. We can then log them in.
		res
			.cookie('access_token', token, {
				httpOnly: true,
			})
			.status(200)
			.json(othersData);
	} catch (err) {
		next(err);
	}
};

/* The line const salt = bcrypt.genSaltSync(10); is generating a salt using the bcrypt library. 
A salt is a random piece of data that is combined with a user's password before hashing it. 
This process improves the security of stored passwords.

In this case, the salt is generated synchronously with a work factor of 10, 
which determines the complexity of the salt. A higher work factor increases the time 
required to generate the salt, making it more difficult for an attacker to carry out brute-force 
attacks on the hashed passwords.*/

//We also need to add the router.post route for sign in to our auths.js routes
export const signin = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (!user) return next(handleError(404, 'User not found'));

		const isCorrect = await bcrypt.compare(req.body.password, user.password);

		if (!isCorrect) return next(handleError(400, 'Wrong password'));

		const token = jwt.sign({ id: user._id }, process.env.JWT);

		res.status(200).json({ token });
	} catch (err) {
		next(err);
	}
};

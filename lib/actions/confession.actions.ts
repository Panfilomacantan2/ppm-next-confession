'use server';

import Confession from '../models/confessions.model';
import { connectToDB } from '../mongoose';

export const createConfession = async (data: any) => {
	try {
		await connectToDB();
		const confession = new Confession(data);
		console.log(confession);

		await confession.save();
	} catch (error) {
		console.log(error);
	}
};

export const getAllConfessions = async () => {
	await connectToDB();
	const confessions = await Confession.find({}).lean();

	const plainConfessions = confessions.map((confession) => ({
		...confession,
		_id: (confession._id as string).toString(),
	}));

	return plainConfessions;
};

export const likeConfession = async (confessionId: string) => {
	try {
		// Connect to the database
		await connectToDB();

		// Find the confession by ID
		const confession = await Confession.findById(confessionId?.toString());

		if (!confession) {
			throw new Error('Confession not found!');
		}

		// Increment the like count
		confession.likes += 1;

		// Save the updated confession
		await confession.save();
	} catch (error) {
		console.error('Error liking confession:', error);

		// Re-throw the error with a clear message
		throw new Error('Failed to like confession');
	}
};

export const getSingleConfession = async (id: string) => {
	try {
		await connectToDB();
		const confession = await Confession.find({ _id: id }).lean();

		if (!confession) {
			throw new Error('Confession not found!');
		}

		const plainConfessions = confession.map((confession) => ({
			...confession,
			_id: (confession._id as string).toString(),
		}));

		return plainConfessions[0];
	} catch (error) {
		console.log(error);
	}
};

export const addCommentToConfession = async (id: string, author: string, content: string, avatar: string) => {
	try {
		await connectToDB();
		// Find the confession by id
		const confession = await Confession.findById({ _id: id });

		console.log(confession);

		if (!confession) {
			throw new Error('Confession not found');
		}

		// Create a new comment object
		const newComment = {
			author: author || 'Anonymous',
			content: content,
			avatar: avatar,
			createdAt: new Date(),
		};

		// Add the new comment to the comments array
		confession.comments.push(newComment);

		// Save the updated confession
		await confession.save();
	} catch (error) {
		console.error('Error adding comment:', error);
		throw error;
	}
};

export async function getUserConfessions(userId: string) {
	try {
		await connectToDB();
		const confession = await Confession.find({ user_id: userId });

		if (!confession) {
			throw new Error('Confession not found!');
		}

		return confession;
	} catch (error) {
		console.log(error);
	}
}

export const deleteMyConfession = async (id: string) => {
	try {
		await connectToDB();
		await Confession.findByIdAndDelete(id);
	} catch (error) {
		console.log(error);
	}
};

import mongoose from 'mongoose';

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
	// Set strict query mode for Mongoose to prevent unknown field queries.
	mongoose.set('strictQuery', true);

	if (!process.env.MONGODB_URL) return console.log('Missing MongoDB URL');

	// If the connection is already established, return without creating a new connection.
	if (isConnected) {
		console.log('MongoDB connection already established');
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URL, {
			bufferCommands: false, // Disable mongoose buffering
			serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of buffering
			socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
		});

		isConnected = true; // Set the connection status to true
		console.log('MongoDB connected');
	} catch (error) {
		console.log('Error connecting to MongoDB:', error);
	}
};

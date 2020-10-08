const config ={
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://Lin:linjiajun110@cluster0.uwzzg.mongodb.net/<dbname>?retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret'
}

module.exports = config;

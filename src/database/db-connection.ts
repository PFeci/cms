import * as mongoose from 'mongoose';


class DbConnection {

    public db: mongoose.Mongoose;

    private database = {
        dbUser: 'admin',
        dbPassword: 'admin',
        dbServer: 'ds038319.mlab.com:38319',
        dbName: 'cms-internet'
    };

    public connect(): void {
        const options = {
            useMongoClient: true,
            autoReconnect: true,
            reconnectInterval: 1000,
            keepAlive: 1500,
            reconnectTries: Number.MAX_VALUE
        };
        mongoose.connect('mongodb://' + this.database.dbUser + ':' + this.database.dbPassword + '@' + this.database.dbServer + '/' + this.database.dbName, options);
        this.db = mongoose;
    }

    public errorHandler(): void {
        mongoose.connection.on('error', () => {
            console.log('Server is unreachable.');
        });
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        mongoose.connection.on("reconnected", () => {
            console.log("Reconnected to MongoDB");
        });
        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected.');
        });
        mongoose.connection.once('open', () => {
            console.log('MongoDB connection opened.');
        });
    }
}

export default new DbConnection();
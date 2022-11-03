import mongoose from 'mongoose'

// To use global promise for mongoose
;(<any>mongoose).Promise = global.Promise

/** Callback for establishing or re-stablishing mongo connection */
type IOnConnectedCallback = () => void

export default class MongoConnection {
    /** URL to access mongo */
    private readonly mongoUrl: string

    /** Callback when mongo connection is established or re-established */
    private onConnectedCallback!: IOnConnectedCallback

    /**
     * Internal flag to check if connection established for
     * first time or after a disconnection
     */
    private isConnectedBefore: boolean = false

    /** Mongo connection options to be passed Mongoose */
    private readonly mongoConnectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    /**
     * Start mongo connection
     * @param mongoUrl MongoDB URL
     * @param onConnectedCallback callback to be called when mongo connection is successful
     */
    constructor(mongoUrl: string) {
        if (process.env.NODE_ENV === 'development') {
            mongoose.set('debug', true)
        }

        this.mongoUrl = mongoUrl
        mongoose.connection.on('error', this.onError)
        mongoose.connection.on('disconnected', this.onDisconnected)
        mongoose.connection.on('connected', this.onConnected)
        mongoose.connection.on('reconnected', this.onReconnected)
    }

    /** Close mongo connection */
    public close(onClosed: (err: any) => void) {
        console.log('Closing Mongo Connection')
        // noinspection JSIgnoredPromiseFromCall
        mongoose.connection.close(onClosed)
    }

    /** Start mongo connection */
    public connect(onConnectedCallback: IOnConnectedCallback) {
        this.onConnectedCallback = onConnectedCallback
        this.startConnection()
    }

    private readonly startConnection = () => {
        console.log('Trying to connect to MongoDB')
        mongoose.connect(this.mongoUrl, {
            retryWrites: true,
            w: 'majority',
            ...this.mongoConnectionOptions,
        })
    }

    /**
     * Handler called when mongo connection is established
     */
    private readonly onConnected = () => {
        console.log('MongoDB connection established')
        this.isConnectedBefore = true
        this.onConnectedCallback()
    }

    /** Handler called when mongo gets re-connected to the database */
    private readonly onReconnected = () => {
        console.log('MongoDB reconnected')
        this.onConnectedCallback()
    }

    /** Handler called for mongo connection errors */
    private readonly onError = () => {
        console.error('MongoDB connection error')
    }

    /** Handler called when mongo connection is lost */
    private readonly onDisconnected = () => {
        if (!this.isConnectedBefore) {
            setTimeout(() => {
                this.startConnection()
            }, 2000)
            console.log('MongoDB disconnected')
        }
    }
}

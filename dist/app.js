"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logging_1 = __importDefault(require("./library/Logging"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
//! imp routes
const admin_1 = __importDefault(require("./routes/admin"));
const shop_1 = __importDefault(require("./routes/shop"));
//! imp controllers
const errorController = __importStar(require("./controllers/error"));
const user_1 = __importDefault(require("./models//user"));
// import Order from './models/order';
// import OrderItem from './models/order-item';
//! imp database
const mongoose_1 = __importDefault(require("mongoose"));
//! createExpress -> instance Express()
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', 'src/views');
//! Register Middlewares
app.use(express_1.default.urlencoded({ extended: false }));
//! app.ts => root Directory : src
const publicDir = path_1.default.join(__dirname, '..', 'public');
app.use(express_1.default.static(publicDir));
//! Authentication
app.use((req, res, next) => {
    Logging_1.default.infoAsync('Authentication', () => {
        const currentUserId = '632fe0941cb168613f986706';
        user_1.default.findById(currentUserId)
            .then((userDoc) => {
            //! Store it in a Request, we will set request.user
            // console.log('__Debugger__req.user.cart: ', userDoc!.cart);
            req.user = userDoc;
            next();
        })
            .catch((err) => err);
    });
});
//! implementing Routes
app.use('/admin', admin_1.default);
app.use(shop_1.default); //! default: '/'
//! default '/', this will also handle all http methods, GET, POST, DELTE, PATCH, PUT...
app.use(errorController.get404);
const MONGODB_USERNAME = 'njs101x';
const MONGODB_PASSWORD = 'njs101x';
const DATABASE = 'shop';
//! connect method that takes the URL we used for connecting before
mongoose_1.default
    .connect(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.nbojriq.mongodb.net/${DATABASE}?retryWrites=true&w=majority`)
    .then((mongooseConnection) => {
    // console.log('__Debugger__mongooseConnection: ', mongooseConnection);
    const initialCart = {
        items: [],
        total: 0,
    };
    user_1.default.findOne({})
        .then((userDoc) => {
        if (!userDoc) {
            const user = new user_1.default({
                name: 'thangncfx16840',
                email: 'thangncfx16840@funix.edu.vn',
                cart: initialCart,
            });
            user.save();
        }
    })
        .catch((err) => {
        console.log(err);
    });
    const PORT = 3000;
    app.listen(PORT, () => {
        Logging_1.default.info('Server is running in port ' + PORT);
    });
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=app.js.map
// setup express and passport using async/await

const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');

// const User = require('./models/user');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.use(express.static('public'));
// add in mongoose

// connect to MongoDB database-cloud
// await mongoose.connect("mongodb+srv://process.env.API_KEY@cluster0.yes5szi.mongodb.net/wikiDB", {useNewUrlParser: true});


mongoose.Promise = global.Promise;

// use async/await and try/catch to handle errors

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log('connected to database');
});


// create data schema for new users

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// create model for new users

const User = mongoose.model('User', userSchema);



app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());

app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// routes with middleware

app.get('/', async (req, res) => {
    try{
    res.render('index');
    } catch(err){
        console.log(err);
    }
});

app.get('/login', async (req, res) => {
    try{
        res.render('login');
        } catch(err){
            console.log(err);
        }
});

app.get('/signup', async (req, res) => {
    try{
        res.render('signup');
        } catch(err){
            console.log(err);
        }
    
});

app.get('/logout', async (req, res) => {
    try{
    req.logout();
    res.redirect('/');
    } catch(err){
        console.log(err);
    }
});

app.post('/login', async (req, res, next) => {
    try{
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('error', info.message);
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    })(req, res, next);
    } catch(err){
        console.log(err);
    }
});

app.post('/signup', async (req, res, next) => {
    try{
    passport.authenticate('local-signup', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('error', info.message);
            return res.redirect('/signup');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    })(req, res, next);
    } catch(err){
        console.log(err);
    }
});

app.get('/user/:id', async(req, res) => {
    try{
    User.findById(req.params.id, (err, user) => {
        if (err) {
            return next(err);
        }
        res.render('user', { user });
    });
    } catch(err){
            console.log(err);
    }
});

app.post('/user/:id', async (req, res) => {
    try {
    User.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } }, (err, user) => {
        if (err) {
            return next(err);
        }
        res.redirect('/user/' + req.params.id);
    });
    } catch (err) {
        console.log(err);
    }
});

app.get('/logout', async (req, res) => {
    try{
    req.logout();
    res.redirect('/');
    } catch(err){
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

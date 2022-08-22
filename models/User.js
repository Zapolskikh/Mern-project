const {Schema, model} = require('mongoose');
const { Types } = require('mongoose/lib/schema');

/*
// `UserModel` is a "Model", a subclass of `mongoose.Model`.
*     const UserModel = mongoose.model('User', new Schema({ name: String }));
*
*     // You can use a Model to create new documents using `new`:
*     const userDoc = new UserModel({ name: 'Foo' });
*     await userDoc.save();


#### Example:
 *
 *     const child = new Schema({ name: String });
 *     const schema = new Schema({ name: String, age: Number, children: [child] });
 *     const Tree = mongoose.model('Tree', schema);
 *
 *     // setting schema options
 *     new Schema({ name: String }, { _id: false, autoIndex: false })
 *


*/

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    links: [{type: Types.ObjectID, ref: 'Link'}] //Зачем квадратные скобки 
});

module.exports = model('User', schema);
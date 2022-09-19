const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Joi = require('joi');
const { func } = require('joi');

//app.use(bodyParser.json());//этим пользуються
app.use(express.json());

const courses = [
	{id:1, name: 'course1'},
	{id:2, name: 'course2'},
	{id:3, name: 'course3'}
];

app.get('/', (req, res) => {
	res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
	res.send([1,2,3]);
});

//api/courses/1
app.get('/api/courses/:id', (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) res.status(404).send('The course with given Id was empty!');

	res.send(course);
});

app.post('/api/courses', (req, res) => {
	const schema = Joi.object({
		name: Joi.string().min(3).required()	
	});

	const result = schema.validate(req.body);
	console.log(result);

	if (result.error) {
		res.status(400).send(result.error.details[0].message);
		return;
	}

	const course = {
		id: courses.length + 3,
		name: req.body.name + '333'
	};
	console.log(req.body);
	courses.push(course);

	res.send(courses);
	res.end();//надо закрывать
});

app.put('api/courses/:id', (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) res.status(404).send('The course with given Id was empty!');

	const result = validata(req.body);
	console.log(result);

	if (result.error) {
		res.status(400).send(result.error.details[0].message);
		return;
	}

	course.name = req.body.name;
	res.send(courses);
	res.end();//надо закрывать
});

app.delete('api/courses/:id', (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) res.status(404).send('The course with given Id was empty!');

	const index = courses.indexOf(course);
	course.splice(index, 1);
});

function validata(course) {
	const schema = Joi.object({
		name: Joi.string().min(3).required()	
	});
	return schema.validate(course);
}
// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listenen on port ${port}...`));
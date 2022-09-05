const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { userOne, userTwo, taskOne, taskTwo, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'Run node scripts'
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
})

test('Should get all tasks for a user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toBe(2)
})

test('Check user cannot delete someone elses tasks', async () => {
    await request(app)
        .delete('/tasks/' + taskOne._id)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)

    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})

test('Should not create task with invalid description/completed', async () => {
    await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: ''
        })
        .expect(400)

    await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'Create test suite',
            completed: 'Yes'
        })
        .expect(400)
})

test('Should not update task with invalid description/completed', async () => {
    await request(app)
        .patch('/tasks/' + taskOne._id)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: ''
        })
        .expect(500)

    await request(app)
        .patch('/tasks/' + taskOne._id)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'Create test suite',
            completed: 'Yes'
        })
        .expect(500)
})

test('Should delete a task', async () => {
    await request(app)
        .delete('/tasks/' + taskOne._id)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const task = await Task.findById(taskOne._id)
    expect(task).toBeNull()
})

test('Should not delete task if unauthenticated', async () => {
    await request(app)
        .delete('/tasks/' + taskOne._id)
        .send()
        .expect(401)

    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})

test('Should not update other users task', async () => {
    await request(app)
        .patch('/tasks/' + taskOne._id)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send({
            completed: true
        })
        .expect(404)
})

test('Should fetch user task by id', async () => {
    await request(app)
        .get('/tasks/' + taskOne._id)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not fetch user task if unauthenticated', async () => {
    await request(app)
        .get('/tasks/' + taskOne._id)
        .send()
        .expect(401)
})

test('Should not fetch other users task by id', async () => {
    await request(app)
        .get('/tasks/' + taskOne._id)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
})

test('Should fetch only completed tasks', async () => {
    const response = await request(app)
        .get('/tasks?completed=true')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toBe(1)
})

test('Should fetch only incomplete tasks', async () => {
    const { body: tasks } = await request(app)
        .get('/tasks?completed=false')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(tasks.length).toBe(1)
})

test('Should sort tasks by description/completed/createdAt/updatedAt', async () => {
    const { body: tasksByDescription } = await request(app)
        .get('/tasks?sortBy=description_desc')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
    expect(tasksByDescription[0]._id.toString()).toBe(taskTwo._id.toString())

    const { body: tasksByCompleted } = await request(app)
        .get('/tasks?sortBy=completed_desc')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
    expect(tasksByCompleted[0]._id.toString()).toBe(taskTwo._id.toString())

    const { body: tasksByCreatedAt } = await request(app)
        .get('/tasks?sortBy=createdAt_desc')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
    expect(tasksByCreatedAt[0]._id.toString()).toBe(taskTwo._id.toString())

    await Task.findByIdAndUpdate(taskOne._id, { completed: true })
    const { body: tasksByUpdatedAt } = await request(app)
        .get('/tasks?sortBy=updatedAt_desc')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
    expect(tasksByUpdatedAt[0]._id.toString()).toBe(taskOne._id.toString())
})

test('Should fetch page of tasks', async () => {
    const { body: tasks } = await request(app)
        .get('/tasks?skip=0&limit=1')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(tasks.length).toBe(1)
})
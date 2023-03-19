import Project from '../Models/Project.js'
import Task from '../Models/Task.js'
import Column from '../Models/Column.js'

export const resolvers = {
        Query:{
            hello: ()=>{
                return 'Hello World with Graphql'
            },
            greet: (root, { name }, ctx)=>{
                return `Hello ${name}`
            },
            async Tasks(){
                return await Task.find();
            },
            async Users(){
                return await User.find();
            },
            async getProject(){
                return await Project.find()
            }
        }, 
        Mutation: {
            async createTask(_, { input }){
                const newTask = new Task(input); 
                await newTask.save();
                console.log(newTask)
                return newTask
            },
            async updateProject(_, {_id, input }){
                return await Project.findByIdAndUpdate(_id, input, { new: true })
            },
            async createProject(_, { input }){
                const newProject = new Project(input); 
                await newProject.save();
                console.log(newProject)
                return newProject
            },
            async updateProject(_, {_id, input }){
                return await Project.findByIdAndUpdate(_id, input, { new: true })
            },
            async createUser(_, { input }){
                const newUser = new User(input)
                await newUser.save()
                console.log(newUser)
                return newUser
            },
            async deleteUser(_, { _id }){
               return await User.findByIdAndDelete(_id);
            },
            async updateUser(_, {_id, input }){
                return await User.findByIdAndUpdate(_id, input, { new: true })
            },

            // Column resolvers 
            async createColumn(_, { input }){
                const newColumn = new Column(input)
                await newColumn.save()
              
                const updatedProject = await Project.findByIdAndUpdate(
                  input.projectId,
                  { $push: { columns: newColumn } },
                  { new: true }
                )
              
                console.log(newColumn)
                return updatedProject
            },
            async updateColumn(_, { _id, input }){     
                try {
                  const updatedProject = await Project.findByIdAndUpdate(
                    input.projectId,
                    { $set: { [`columns.$[col].input[name]`]: input.name } },
                    { new: true, arrayFilters: [{ "col._id": _id }] }
                  );
                  const updatedColumn = updatedProject.columns.find(column => column._id.toString() === _id);
                  return updatedColumn;
                } catch (err) {
                  throw new Error(`Could not update column with ID ${_id} in project with ID ${input.projectId}: ${err.message}`);
                }
        },
    }
    
}


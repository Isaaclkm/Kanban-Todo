

module.exports = {
    resolvers : {
        Query:{
            hello: ()=>{
                return 'Hello World with Graphql'
            },
            greet: (root, { name }, ctx)=>{
                return `Hello ${name}`
            },
            tasks(){
                return tasks
            },
            async Users(){
                return await User.find();
            },
            async getProjects(){
                return await Projects.find()
            }
        }, 
        Mutation: {
            createTask(_, { input }){
                input._id = tasks.length
                tasks.push(input);
                return input;
            },
            createProject(_, { input }){
                tasks.push(input);
                return input;
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
            }
    
        }
    }
} 
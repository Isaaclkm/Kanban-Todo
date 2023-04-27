import './App.css';
import CardItem from './components/CardItem';
import Sidebar from './components/Sidebar';
import Board from './components/Board'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Switch} from 'react-router-dom'

import { useQuery, gql } from '@apollo/client';
import { useEffect, useState } from 'react';


const GET_PROJECTS = gql`
  query  {
    projects {
      _id
      name
    }
  }
`;



function App() {
  // const [projects, setProjects] = useState([]);

  const { loading, error, data, refetch } = useQuery(GET_PROJECTS);
  const [selectedProject, setSelectedProject] = useState(null);


  const handleProjectSelect = (projectId) => {
    setSelectedProject(projectId);
  };

  // useEffect(() => {
  //   if (data) {
  //     setProjects(data.projects);
  //   }
  // }, [data]);

  // const updateProjects = (newProject) => {
  //   setProjects([...projects, newProject]);
  // };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  const { projects } = data;

  return (
    <Router>
      <div className="App flex flex-row flex-auto overflow-clip h-full">
        <Sidebar projects={projects} onProjectSelect={handleProjectSelect} />
       <Switch>
            {/* <Route path="/project/:id" component={Board}/> */}
          <Route path= '/project/:id'>
            <Board selectedProject={selectedProject} />
          </Route>
       </Switch>
      </div>
    </Router>
  );
}

export default App;

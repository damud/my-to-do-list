import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import {useEffect, useState} from "react";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;  
  const [tasks, setTasks] = useState(null);
 
  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (authToken) {
      getData()
    }} 
    , [])

  // Sort by date
  const sortedTasks =tasks?.sort((a,b) => new Date(a.date) - new Date(b.date));
  return (
    <div className="app">
     {!authToken && <Auth/>}
      {authToken && 
      <>
      <ListHeader listName={"📝 My tasks list"} getData={getData} />
      <p className="user-email">Welcome back {userEmail}</p>
        <p className="info-message">
          {tasks && tasks.length ? '' : 'There is no any task yet. Add one...'}
          </p>
        {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
      </>
      }
      <p className="task-total">Total tasks: {tasks && tasks.length ? tasks.length : 0}</p>
      <p className="copyright">© Code with 💗 in Poland</p>
      </div>
  );
}

export default App;

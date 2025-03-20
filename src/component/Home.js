import React from 'react'
import TaskListComponent from './TaskList'
function Home() {
    return (
        <div className='Home-cont'>
            <p className="text">Manage your tasks efficiently and stay organized</p>
            <TaskListComponent />
        </div>
    )
}
export default Home
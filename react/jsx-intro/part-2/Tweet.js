const Tweet = ({username , name, date, msg}) => (
    <div className = "tweet">
        <h3 className = 'msg' >{msg}</h3>
        <ul className = 'info'>
            <li>{date}</li>
            <li>Username : {username}</li>
            <li>Name : {name}</li>
        </ul>
    </div>
)
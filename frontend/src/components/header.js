const Header = ({ user }) => {
    return (
        <div className="header">
            <a href="/" className="logo"><h1>Youtube <span>HC</span></h1></a>
            {user ? 
                <a href={"/profile/" + user.id} className="profile"><ion-icon name="person-sharp"></ion-icon></a>
            : <></>}
        </div>
    );
}

export default Header;
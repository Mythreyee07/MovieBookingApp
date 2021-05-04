function form()
{
    var a = document.getElementById("mail").value;
    if(a== null|| a=="")
    {
        alert("Email is not filled");
    }
    var b = document.getElementById("pass").value;
    if(b== null|| b=="")
    {
        alert("Password is not filled");
      
    }
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(a))
{
    return true;
}
else
{
alert("Enter valid emaili_d");

}
}
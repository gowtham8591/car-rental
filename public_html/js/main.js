
function carType()
{
	var carId = document.getElementById("cartype");
    var selected = carId.options[carId.selectedIndex].value;
	if(selected)
	{
	return selected;
	}
	else 
	{
		alert("please select car type");
	throw new Error("Something went badly wrong!");
	
	}
	
}

function city()
{
	var cityId = document.getElementById("city");
    var selected = cityId.options[cityId.selectedIndex].value;
	if(selected)
	{
	return selected;
	}
	else 
	{
		alert("please select city");
	throw new Error("Something went badly wrong!");
	
	}
	
}

function visible()
{
	var visible = document.getElementById("apDiv21");
	
	
	if (carType() == "49.99")
	{
		visible.style.visibility = 'visible';
	}
	
	else 
	{
		visible.style.visibility = 'hidden';
	}
}

function services()
{
	var collision = 0;
	var gift = 100;
	var wash = 50;
	
	
	if(document.getElementById("cartype").options[document.getElementById("cartype").selectedIndex].value == "29.99")
	{
		collision = 17;
	}
	
	
	if(document.getElementById("cartype").options[document.getElementById("cartype").selectedIndex].value == "39.99")
	{
		collision = 22;
	}
	
	
	if(document.getElementById("cartype").options[document.getElementById("cartype").selectedIndex].value == "49.99")
	{
		collision = 28;
	}
	
	
	if(!document.getElementById("collision").checked)
	{
		collision = 0;
	}
	
	if(!document.getElementById("gift").checked)
	{
		gift = 0;
	}
	
	if(!document.getElementById("car wash").checked)
	{
		wash = 0;
	}
	
	
	var total = collision + gift+ wash;
	
	return total;
	
	
}


function date_validate()
{
	var start = document.getElementById("start").value;
	var end = document.getElementById("end").value;
	var start_date = Date.parse(start);
	var end_date = Date.parse(end);
	
	if(start_date > end_date )
	{
		alert ("End date should be Less than Start date");
		document.getElementById("start").value= "";
		document.getElementById("end").value = "";
}

}

function day_validate()
{
	var days = document.getElementById("days").value;
	if (days % 1 == 0 && (days))
	{
		days = document.getElementById("days").value;
	}
	
	else
	{
	
	alert("Enter valid integer");
	document.getElementById("days").value = "";
	}
}

function days()
{
	var days = document.getElementById("days").value;
	var cal;
	
	
	if(days)
	{
	
		
	if (days % 1 == 0 && (days))
	{
    if(days > 15){cal = 10;}
	
	else cal = 0;
	 
	 if(days >30){cal = 20;}
	 else cal = 0;
	}
	return cal;
	}
	else 
	{
		alert("please enter duration");
	throw new Error("Something went badly wrong!");
	
	}
	
	
	
	

	
	
}


function amount()
{
	var car_amount = parseFloat(carType());
	var city_amount = parseFloat(city());
	var discount = parseInt(days());
	
	var sub1 = parseFloat((car_amount) + ((car_amount*city_amount)/100));
	var sub2 = parseFloat((sub1) - ((sub1 * discount)/100));
	
	
	
	
	return sub2;
	
}

function amount2 ()
{
	var a = amount();
	var b = services();
	var c = a+b;
	document.getElementById("apDiv42").style.visibility="visible";
	document.getElementById("apDiv42").innerHTML="Total cost is "+c;	
}
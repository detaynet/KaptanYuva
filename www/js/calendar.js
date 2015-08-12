function calendar(date) {
  // If no parameter is passed use the current date.
  if(date == null)
     date = new Date();

  day = date.getDate();
  month = date.getMonth();
  txtMonth = '';
  nmonth = parseInt(month)+1;
  if(month < 10){ txtMont = '0'+nmonth; } else { txtMonth = nmonth; }
  year = date.getFullYear();
	if(lang == 'tr'){
  		months = new Array('Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık');
		days = new Array("P","S","Ç","P","C","C","P");
	}
	if(lang == 'en'){
  		months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
		days = new Array("M","T","W","T","F","S","S");
	}

	this_month = new Date(year, month, 1);
	next_month = new Date(year, month + 1, 1);
	
	// Find out when this month starts and ends.
	first_week_day = this_month.getDay()-1;
	days_in_this_month = Math.round((next_month.getTime() - this_month.getTime()) / (1000 * 60 * 60 * 24));
	
	calendar_html = '<table class="calendarTable">';
	calendar_html += '<tr><td colspan="7" class="calendarHead" style="color:#fff;background-color:#b20101;">' + months[month] + ' ' + year + '</td></tr>';
	calendar_html += '<tr>';
	calendar_html += '<tr style="background-color:#eee;"><td>'+days[0]+'</td><td>'+days[1]+'</td><td>'+days[2]+'</td><td>'+days[3]+'</td><td>'+days[4]+'</td><td>'+days[5]+'</td><td>'+days[6]+'</td></tr>';
	
  // Fill the first week of the month with the appropriate number of blanks.
  for(week_day = 0; week_day < first_week_day; week_day++) {
    calendar_html += '<td> </td>';
  }

	week_day = first_week_day;
	for(day_counter = 1; day_counter <= days_in_this_month; day_counter++) {
		week_day %= 7;
		if(week_day == 0){ calendar_html += '</tr><tr>'; }
		
		// Do something different for the current day.
		if(day == day_counter){
			if(day_counter < 10){ txtDay = '0'+day_counter; } else { txtDay = day_counter; }
			dayBG = 'style="background-color:#f00;color:#fff;"';
			calendar_html += '<td '+dayBG+' onclick="getMeal(\''+year+'-'+txtMont+'-'+txtDay+'\')"><b>' + day_counter + '</b></td>';
		} else {
			if(day_counter < 10){ txtDay = '0'+day_counter; } else { txtDay = day_counter; }
			if(week_day > 4){ dayBG = 'style="background-color:#eee;"'; } else { dayBG = ''; }
			calendar_html += '<td '+dayBG+' onclick="getMeal(\''+year+'-'+txtMont+'-'+txtDay+'\')"> ' + day_counter  + ' </td>';
		}
		week_day++;
	}
	
	calendar_html += '</tr>';
	calendar_html += '</table>';
	
	// Display the calendar.
	$('.calendarCont ').html(calendar_html);
}
// JavaScript Document
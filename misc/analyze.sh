#!/bin/bash

cat attendees.txt | awk '
BEGIN{
	FS="\t";
}

{
	if (NR > 1) {
		name = $1;
		status = $3;
		if (status == "Accepted" || status == "Accepteret") {
			accepted[name] = name;
		} else if (status == "Declined" || status == "Afslået") {
			declined[name] = name;
		} else if (status == "None" || status == "Ingen"){
			none[name] = name;
		} else {
			printf "%s answered %s\n", name, status
		}
	}
	
}

END {
	print "Accepted: "
	for (name in accepted) {
		print name
	}
	print "";
	
	print "Declined: "
	for (name in declined) {
		print name
	}
	print ""
	
	print "Not responded: "
	for (name in none) {
		print name
	}
}
'
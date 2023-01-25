# Database schema

* Modul(**ID**, title, beginning, end, *creator_id*, pointsFor2, pointsFor3, pointsFor4, pointsFor5, banner)
* Task(**ID**, *modul_id*, title, summary, description, points, teamwork, headcount)
* Attachment(**ID**, url, *task_id*, *uploader_id*)
* Class(**ID**, name, subject)
* Learns(*modul_id*, *class_id*)
* User(**ID**, name, email, role, password)
* Attends(*class_id*, *user_id*)
* Message(**ID**, *from*, *to*, timestamp, body, status, labels)
* Commitment(**ID**, **task_id**, **user_id**, points, status, deadline)
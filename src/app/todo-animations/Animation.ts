import { Component, OnInit, trigger, transition, style, animate, state } from '@angular/core';

/* Animation that will be applied adding / deleting todos */
export let fade = trigger("fade", [
	transition('void <=> *', [
		style({ opacity: 0, backgroundColor: 'grey' }),
		animate(500)
	])
])

// TODO: this should only apply to one that is active??

/* Custom animation that will trigger on checking and unchecking the check boxes */
export let highlight = trigger("highlight", [
	state('completed',
		style({ opacity: 0.5, outline: '1px solid blue' }),
	),
	state('notcompleted',
		style({ opacity: 1 })
	),
	transition("completed => notcompleted", animate("1000ms ease-in")),
	//transition("notcompleted => completed", animate("1000ms ease-out"))
]

)	
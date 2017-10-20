import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';

export let fade = 	trigger("fade", [
		transition('void <=> *', [
			style({opacity:0, backgroundColor: 'grey'}),
			animate(500)
		])
	])
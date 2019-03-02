import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, ActivationEnd } from '@angular/router';
import { filter, map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  public titulo: string;

  constructor( private router:Router,
               private title:Title,
               private meta: Meta ) {

    this.getTittle()
      .subscribe ( events => {
        this.titulo = events.titulo;
        this.title.setTitle ( this.titulo );

        const metaTag: MetaDefinition = {
          name: "description",
          content: this.titulo
        }

        this.meta.updateTag ( metaTag );
    });
  }

  ngOnInit() {
  }

  public getTittle ():Observable<any> {
    return this.router.events.pipe(
      filter ( (event: ActivationEnd) => { return event instanceof ActivationEnd && !event.snapshot.firstChild; } ),
      map ( ( event: ActivationEnd )=> { return event.snapshot.data; } )
    );

  }

}

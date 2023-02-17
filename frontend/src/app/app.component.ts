import {Component, Renderer2, ViewChild} from '@angular/core';
import {MatDrawer, MatDrawerMode} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  @ViewChild("drawer") drawer!: MatDrawer;

  mode: MatDrawerMode = "side";

  threshold: number = 1000;

  getScreenWidth(): number {
    return window.innerWidth;
  }

  setMenuMode = (e: Event) => {
    if (this.getScreenWidth() >= this.threshold){
      if (this.mode === "over"){
        this.drawer.open();
      }
      this.mode = "side";
    } else {
      if (this.mode === "side"){
        this.drawer.close();
      }
      this.mode = "over"
    }
  }

  constructor(private renderer: Renderer2) {
    this.renderer.listen("window", "resize", this.setMenuMode);
    this.mode = this.getScreenWidth() >= this.threshold ? "side" : "over";
  }
}

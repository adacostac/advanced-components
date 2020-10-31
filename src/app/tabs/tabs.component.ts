import { AfterContentInit, Component, ContentChild, OnInit, OnDestroy, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from "app/tab/tab.component";
import { Subscription } from 'rxjs/Subscription';
import { Tab } from "../tab/tab.interface";


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit, OnDestroy {

  private tabClickSubscriptions: Subscription[] = [];

  @ContentChildren(TabComponent) public tabs:QueryList<TabComponent>;

  constructor() { }

  ngOnInit() { }

  ngAfterContentInit() {
    console.log(this.tabs);
    this.tabs.forEach(tab => {
      let subscription = tab.onClick.subscribe(() => {
        console.log(`tab ${tab.title} content click`)
      })
      this.tabClickSubscriptions.push(subscription);
    });
    this.selectTab(this.tabs.first);
  }

  selectTab(tab:Tab) {
    // se iteran todos los tabs del QueryList y se pone a false
    this.tabs.forEach(tab => {
      tab.isActive = false;
    })
    // el tab que se recibe se pone a true
    tab.isActive = true;
  }
  
  ngOnDestroy() {
    if (this.tabClickSubscriptions) {
      this.tabClickSubscriptions.forEach(tab => {
        tab.unsubscribe();
      })
    }
  }

}

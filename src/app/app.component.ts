import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit, AfterViewInit {

  public isAddTimerVisible: boolean = false;

  public time: number = 0;
  public timers: Array<number> = [];
  public simpleAlert: ComponentRef<SimpleAlertViewComponent> = null;

  // @ViewChildren(SimpleAlertViewComponent) alerts: QueryList<SimpleAlertViewComponent>;
  @ViewChild('timerInput') timeInput: ElementRef
  @ViewChild('alert', {read: ViewContainerRef}) alertContainer: ViewContainerRef; // Permite crear componentes de forma dinamica

  constructor(private cdRef: ChangeDetectorRef, private renderer: Renderer2, private resolver: ComponentFactoryResolver) {
    this.timers = [3, 30, 50, 800]
  }

  ngAfterContentInit() {

  }

  ngAfterViewInit() {
    console.log(this.timeInput);

    this.renderer.setAttribute(this.timeInput.nativeElement, 'placeholder', 'Enter seconds');
    // this.timeInput.nativeElement.setAttribute('placeholder', 'Enter seconds');
    this.renderer.addClass(this.timeInput.nativeElement, 'time-in');
    //this.timeInput.nativeElement.classList.add('time-in');

/*     this.alerts.forEach(alert => {
      if (!alert.title) {
        alert.title = 'Hi';
        alert.message = 'Hello World';
      }
      console.log(alert);
    })

    this.cdRef.detectChanges();      */
  }

  public isShowAlertView() {
    this.isAddTimerVisible = !this.isAddTimerVisible;
    setTimeout(() => {
      this.renderer.selectRootElement(this.timeInput.nativeElement).focus();
      //this.timeInput.nativeElement.focus()
    })
  }

  public isEndShowAlertView() {
    //this.alerts.first.isVisible();
    const alertFactory = this.resolver.resolveComponentFactory(SimpleAlertViewComponent); // Crear factoria
    this.simpleAlert = this.alertContainer.createComponent(alertFactory); // Se toma la referencia del componente
    
    this.simpleAlert.instance.title = 'Timer ended';
    this.simpleAlert.instance.message = 'You countdown has finished';
    this.simpleAlert.instance.isVisible();
    console.log(this.simpleAlert.instance);

    this.simpleAlert.instance.onDismiss.subscribe(() => {
      console.log('dismissed');
      this.simpleAlert.destroy();
    })

    
  }

  public submitAddTimer() {
    this.timers.push(this.time);
    this.isShowAlertView();
  }

}

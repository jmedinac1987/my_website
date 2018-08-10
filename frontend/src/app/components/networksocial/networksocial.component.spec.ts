import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworksocialComponent } from './networksocial.component';

describe('NetworksocialComponent', () => {
  let component: NetworksocialComponent;
  let fixture: ComponentFixture<NetworksocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworksocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworksocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

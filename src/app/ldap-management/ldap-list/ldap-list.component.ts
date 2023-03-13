import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserLdap} from "../../model/user-ldap";
import {MatPaginator} from "@angular/material/paginator";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {UsersService} from "../../service/users..service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.scss']
})
export class LdapListComponent implements OnInit {
  displayedColumns: string[] = ['nomComplet','mail','employeNumero'];
  dataSource = new MatTableDataSource<UserLdap>([]);

  @ViewChild(MatPaginator, {static:  true}) paginator: MatPaginator;
  unactiveSelected: boolean = false;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.filterPredicate = (data: UserLdap, filter: string) => this.filterPredicate(data,filter);
    this.getUsers();
  }

  filterPredicate(data: UserLdap, filter: string): boolean {
    return !filter || data.nomComplet.toLocaleLowerCase().startsWith(filter);
  }

  applyFilter($event: KeyboardEvent): void {
    const filterValue = ($event.target as  HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // private getUsers(): void{
  //   this.dataSource.data = LDAP_USERS;
  //   if(this.unactiveSelected){
  //     this.dataSource.data = this.dataSource.data.filter( user => user.active === false)
  //   }
  // }

  private getUsers(): void{
    this.usersService.getUsers().subscribe(users => {
      if(this.unactiveSelected){
        this.dataSource.data = users.filter( user => {
          user.active === false
        });
      }else{
        this.dataSource.data = users
      }
    });
  }

  unactiveChanged($event: MatSlideToggleChange) {
    this.unactiveSelected = $event.checked;
    this.getUsers();
  }

  edit(login: string) {
    this.router.navigate(['/user', login]).then((e) => {
      if (!e) {
        console.log("Navigation has failed");
      }
    })
  }

  addUser(){
    this.router.navigate(['/user/add']).then( (e)=> {
      if(! e) {
        console.log('Navigation has failed!');
      }
    })
  }
}

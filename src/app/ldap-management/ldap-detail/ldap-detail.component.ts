import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {ConfirmValidParentMatcher, passwordValidator} from "./passwords-validator.directive";
import {UserLdap} from "../../model/user-ldap";


export abstract class LdapDetailComponent {
  user: UserLdap;
  processLoadRunning = false;
  processValidateRunning = false;
  passwordPlaceHolder: string;
  errorMessage = '';
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  userForm = this.fb.group({
    login: [''],
    nom: [''],
    prenom: [''],

    passwordGroup: this.fb.group({
        password: [''],
        confirmPassword: ['']
      },
      { validators: passwordValidator }),
    mail: {value: '', disabled: true},
  });

  protected constructor(public addForm:boolean,
                        private fb: FormBuilder,
                        private router: Router,) {
    this.passwordPlaceHolder = 'Mot de passe' + (this.addForm ? '' : ' (vide si inchangé');
  }
  abstract validateForm():void;

  protected onInit():void{

  }

  // ngOnInit(): void {
  //   this.getUser();
  // }


  goToLdap(): void {
    this.router.navigate(['/users/list']);
  }

  updateLogin(): void {
    if(this.addForm) {
      this.userForm.get('login').setValue((this.formGetValue('prenom') + '.' + this.formGetValue('nom')).toLowerCase());
      this.updateMail();
    }
  }

  updateMail(): void {
    if (this.addForm) {
      this.userForm.get('mail').setValue(this.formGetValue('login').toLowerCase() + '@epsi.fr')
    }
  }

  private formGetValue(name: string): any {
    return this.userForm.get(name).value;
  }



  onSubmitForm() {
    this.validateForm();
  }

  isFormValid(): boolean {
    return this.userForm.valid

      && (!this.addForm || this.formGetValue('passwordGroup.password')!== '');
  }

  protected copyUserToFormControl():void {
    this.userForm.get('login').setValue(this.user.login);
    this.userForm.get('nom').setValue(this.user.nom);
    this.userForm.get('prenom').setValue(this.user.prenom);
    this.userForm.get('mail').setValue(this.user.mail);
    // this.userForm.get('employeNumero').setValue(this.user.employeNumero);
    // this.userForm.get('employeNiveau').setValue(this.user.employeNiveau);
    // this.userForm.get('dateEmbauche').setValue(this.user.dateEmbauche);
    // this.userForm.get('publisherId').setValue(this.user.publisherId);
    // this.userForm.get('active').setValue(this.user.active);

  }
  protected getUserFromFormControl(): UserLdap{
    return {
      id:this.userForm.get('id').value,
      login: this.userForm.get('login').value,
      nom: this.userForm.get('nom').value,
      prenom: this.userForm.get('prenom').value,
      nomComplet: this.userForm.get('nom').value + ' ' + this.userForm.get('prenom').value,
      mail: this.userForm.get('mail').value,
      active: true,
      dateEmbauche: "2020-04-24",
      employeNiveau: 1,
      employeNumero: 1,
      motDePasse: "",
      publisherId: 1,
      role: "ROLE_USER"

    };
  }
}



import { Component } from "@angular/core"

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  navigationItems = [
    { label: "لوحة التحكم", href: "#", active: false },
    { label: "إدارة الحسابات", href: "#", active: false },
    { label: "الطلبات", href: "#", active: false },
    { label: "الموظفين", href: "#", active: false },
    { label: "المحفظة", href: "#", active: false },
    { label: "الاعدادات", href: "#", active: true },
  ]

  subNavigationItems = [
    { label: "السياسات", href: "#", active: false },
    { label: "اعدادات الميزانية", href: "#", active: true },
    { label: "المستخدمين", href: "#", active: false },
  ]
}

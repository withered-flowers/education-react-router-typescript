// Pada file ini kita langsung export saja tanpa menggunakan default
export enum PageName {
  // Secara default apabila tidak menggunakan nama alias pada enum
  // adalah akses by value index

  COUNTER_PAGE, // valuenya adalah 0
  FORM_PAGE, // valuenya adalah 1
  TABLE_PAGE, // valuenya adalah 2

  // Namun karena kita menggunakan enum, kita tidak mempedulikan valuenya
  // Kita akan mempedulikan "nama alias"-nya !
}

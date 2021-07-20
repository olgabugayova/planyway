import { BoardPage } from './boardPage';
import { LoginPage } from './loginPage';
import { CardEditDialogClass, CardMenuClass, TaskListMenuClass, ConfirmationDialogClass } from '../pageFragments/index';
import { HomePage } from './homePage';



const application = (page) => ({
    BoardPage: () => new BoardPage(page),
    CardEditDialog: () => new CardEditDialogClass(page),
    CardMenu: () => new CardMenuClass(page),
    LoginPage: () => new LoginPage(page),
    TaskListMenu: () => new TaskListMenuClass(page),
    ConfirmationDialog: () => new ConfirmationDialogClass(page),
    HomePage: () => new HomePage(page),

})

export { application }

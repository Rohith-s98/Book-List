//book Class: Represents a Book
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

//UI Class: Handle UI Tasks
class UI{
    static displayBooks(){
        
        const books =Store.getBooks();
        books.forEach((book)=>UI.addBookToList(book));
    }
    static addBookToList(book){
        const list=document.querySelector('#book-list');
        const row=document.createElement('tr');
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
        
    }
    static clearFields(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }
    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
            UI.showAlert('Succesfully removed','info'); 
        }
    }
    static showAlert(message,className){
        const div=document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container=document.querySelector('.container');
        const form=document.querySelector('#book-form');
        container.insertBefore(div,form);
        //vanish in 3 sec
        setTimeout(()=>document.querySelector('.alert').remove(),3000);
    }
}
//Store class:Handlesz Storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        const books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn){
        const books=Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}

//Events:display books
document.addEventListener('DOMContentLoaded',UI.displayBooks());
//Event: add a book
document.querySelector('#book-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    //get form values
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;
    //validate
    if(title===''||author===''|| isbn===''){
        UI.showAlert('please fill in all the fields','danger');
    }
    else{
        //Instantiate book
    const book=new Book(title,author,isbn);
    //Add book to ui
    UI.addBookToList(book);
    //Add book to store
    Store.addBook(book);
    //success message
    UI.showAlert('Succesfully added','success');
    //clear fields
    UI.clearFields();
    }
})

//Event:remove a book
document.querySelector('#book-list').addEventListener('click',(e)=>{
    //remove from UI
UI.deleteBook(e.target); 
//remove from storage
Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
 
});
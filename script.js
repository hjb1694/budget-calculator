var expenseCollection = [];
var incomeCollection = [];
var totals = {
    income : 0,
    expense : 0
}



function calcTotals(){
    totals.expense = 0;
    totals.income = 0;
    expenseCollection.forEach(function(item,index,array){
        totals.expense += item.amount;
    });
    incomeCollection.forEach(function(item,index,array){
        totals.income += item.amount;
    });
}

function displayTotals(){

    document.querySelector('.income_total').textContent = '$' + totals.income.toFixed(2);
    document.querySelector('.expense_total').textContent = '$' + totals.expense.toFixed(2);
    document.querySelector('.overall_total').textContent = '$' + (totals.income - totals.expense).toFixed(2);

}


function deleteItem(itemId, itemType){

    var DOMItemList;
    var itemCollection;
    if(itemType === 'income-item'){
        DOMItemList = document.querySelectorAll('.income-item');
        itemCollection = incomeCollection;
    }else if(itemType === 'expense-item'){
        DOMItemList = document.querySelectorAll('.expense-item');
        itemCollection = expenseCollection;
    }

    for(item of DOMItemList){

        var listItemId = item.getAttribute('data-itemid');

        if(listItemId == itemId){
            item.remove();
        }

    }


    itemCollection.forEach(function(item,index,array){


        if(item.id == itemId){

            array.splice(index,1);

        }



    });



    calcTotals();
    displayTotals();


}


document.querySelector('#subbut').addEventListener('click',function(e){
    e.preventDefault();
    var fields = {
        description : document.querySelector('#description'), 
        amount : document.querySelector('#amount'), 
        type : document.querySelector('#type')
    }

    var insertion = {
        description : fields.description.value, 
        amount : Number(fields.amount.value)
    }

    var collection;
    if(fields.type.value == 'exp'){
        collection = expenseCollection;
    } else if(fields.type.value == 'inc'){
        collection = incomeCollection;
    }

    var itemId;
    if(collection.length === 0){
        itemId = insertion.id = 1;
    }else{
        itemId = insertion.id = collection[collection.length - 1].id + 1;
    }

    var listArea;
    var itemType;
    if(fields.type.value == 'inc'){
        listArea = document.querySelector('.income_list');
        itemType = 'income-item';
    } else if(fields.type.value == 'exp'){
        listArea = document.querySelector('.expense_list');
        itemType = 'expense-item';
    }

    var listItemContainer = document.createElement('p');
    listItemContainer.setAttribute('data-itemid',itemId);
    listItemContainer.classList.add('list-item');
    listItemContainer.classList.add(itemType);
    var itemDesc = document.createElement('p');
    itemDesc.className = 'list-item__description';
    itemDesc.textContent = insertion.description;
    var amount = document.createElement('p');
    amount.className = 'list-item__amount';
    amount.textContent = '$' + insertion.amount.toFixed(2);
    var closeBtn = document.createElement('p');
    closeBtn.classList.add('delete-btn');
    closeBtn.classList.add('fa');
    closeBtn.classList.add('fa-times')
    closeBtn.title = 'Delete Item from List';
    closeBtn.addEventListener('click',deleteItem.bind(null,itemId,itemType));
    listItemContainer.appendChild(itemDesc);
    listItemContainer.appendChild(amount);
    listItemContainer.appendChild(closeBtn);
    listArea.appendChild(listItemContainer);

    collection.push(insertion);

    calcTotals();

    displayTotals();

    document.querySelector('.input-form').reset();
});


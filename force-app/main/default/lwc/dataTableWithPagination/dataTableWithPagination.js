
import {LightningElement, api} from 'lwc';

export default class DatatableWithPagination extends LightningElement {
    
    // JS Properties 
    pageSizeOptions = [5, 10, 25, 50, 75, 100]; //Page size options
    @api records = []; //All records available in the data table
    @api columns = []; //columns information available in the data table
    @api hideRecordPerPageOption = false;
    @api hideTotalRecordsInfo = false;
    @api hideCheckbox = false;
    totalRecords = 0; //Total no.of records
    pageSize; //No.of records to be displayed per page
    totalPages; //Total no.of pages
    pageNumber = 1; //Page number    
    recordsToDisplay = []; //Records to be displayed on the page
    

    get btnDisableFirst() {
        return this.pageNumber == 1;
    }

    get btnDisableLast() {
        return this.pageNumber == this.totalPages;
    }

    // connectedCallback method called when the element is inserted into a document
    connectedCallback() {
        this.totalRecords = this.records.length; // update total records count                 
        this.pageSize = this.pageSizeOptions[0]; //set pageSize with default value as first option
        this.paginationHelper(); // call helper menthod to update pagination logic 
    }

    handleRecordsPerPage(event) {
        this.pageSize = event.target.value;
        this.paginationHelper();
    }

    previousPage() {
        this.pageNumber = this.pageNumber - 1;
        this.paginationHelper();
    }

    nextPage() {
        this.pageNumber = this.pageNumber + 1;
        this.paginationHelper();
    }

    firstPage() {
        this.pageNumber = 1;
        this.paginationHelper();
    }

    lastPage() {
        this.pageNumber = this.totalPages;
        this.paginationHelper();
    }

    handlerSelection(event){
        const selectedRows = event.detail.selectedRows;
        const selectedEvent = new CustomEvent('selectedrows', { detail: selectedRows });
        this.dispatchEvent(selectedEvent);
    }


    // JS function to handel pagination logic 
    paginationHelper() {
        this.recordsToDisplay = [];
        // calculate total pages
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        // set page number 
        if (this.pageNumber <= 1) {
            this.pageNumber = 1;
        } else if (this.pageNumber >= this.totalPages) {
            this.pageNumber = this.totalPages;
        }

        // set records to display on current page 
        for (let i = (this.pageNumber - 1) * this.pageSize; i < this.pageNumber * this.pageSize; i++) {
            if (i === this.totalRecords) {
                break;
            }
            this.recordsToDisplay.push(this.records[i]);
        }
    }
}
import { Component, OnInit } from '@angular/core';
import { Data } from './data';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  dataList = [];
  tempArr = [];
  tdChecked: boolean = false;
  selectedArray = [];
  deSelect = false;
  constructor() {}
  pagination: any;

  ngOnInit() {
    this.pagination = {
      index: 0,
      size: 10,
    };
    this.dataList = Data;
    this.tempArr = Data;
  }

  trackByFn(index: number, value: string) {
    return index;
  }

  getPageCount() {
    return Math.ceil(this.dataList.length / this.pagination.size);
  }

  getPageIndex(index: number) {
    return Math.floor(index / this.pagination.size);
  }

  getPages() {
    return Array.from({ length: this.getPageCount() }, (_, i) => i);
  }

  filterName(event: any) {
    this.tempArr.map((item) => {
      if (item.id) {
        item.checked = false;
      }
    });
    this.tdChecked = false;
    this.deSelect = false;
    let filterValue = event.target.value;
    let arr = this.tempArr.filter((item) => {
      return item?.name?.toLowerCase().includes(filterValue.toLowerCase());
    });
    if (event.target.value.length > 0) {
      this.pagination = {
        index: 0,
        size: arr.length,
      };
    } else {
      this.pagination = {
        index: 0,
        size: 10,
      };
    }
    this.dataList = arr;
  }

  sortFunc(type, key) {
    function filterArr(key, type) {
      const sortOrder = type === 'ASC' ? 1 : -1;
      return (a, b) => {
        const A = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
        const B = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];
        if (A < B) {
          return sortOrder * -1;
        } else if (A > B) {
          return sortOrder * 1;
        } else {
          return 0;
        }
      };
    }
    this.dataList.sort(filterArr(key, type));
    this.dataList = this.dataList;
  }

  submitRows() {
    let arr1 =
      this.dataList &&
      this.dataList.filter((item) => {
        return item?.checked == true;
      });
    this.selectedArray = [...arr1];
    this.tempArr.map((item) => {
      if (item.id) {
        item.checked = false;
      }
    });
    let arr2 =
      this.dataList &&
      this.dataList.filter((item) => {
        return item?.checked == true;
      });
    if (arr2.length == this.dataList.length) {
      this.deSelect = false;
    } else if (arr2.length > 0) {
      this.deSelect = true;
    } else {
      this.deSelect = false;
    }
    this.tdChecked = false;
  }

  onMasterSelect(event) {
    if (event.target.checked) {
      let tmp = [...this.dataList];
      this.tempArr.map((item) => {
        if (item.id) {
          item.checked = true;
        }
      });
      this.dataList = tmp;
    } else {
      this.tempArr.map((item) => {
        if (item.id) {
          item.checked = false;
        }
      });
    }
    let arr1 = this.dataList.filter((item) => {
      return item?.checked == true;
    });
    if (arr1.length == this.dataList.length) {
      this.deSelect = false;
      this.tdChecked = true;
    } else {
      this.deSelect = false;
    }
  }

  onDeselectAll() {
    this.tempArr.map((item) => {
      if (item.id) {
        item.checked = false;
      }
    });
    let arr1 =
      this.dataList &&
      this.dataList.filter((item) => {
        return item?.checked == true;
      });
    if (arr1.length == this.dataList.length) {
      this.deSelect = false;
    } else if (arr1.length > 0) {
      this.deSelect = true;
    } else {
      this.deSelect = false;
    }
  }

  onSelectRow(event, idx) {
    if (event.target.checked) {
      this.dataList.forEach((item, index) => {
        if (index == idx) {
          item.checked = true;
          this.dataList = this.dataList;
        }
      });
    } else {
      this.dataList.forEach((item, index) => {
        if (index == idx) {
          item.checked = false;
          this.dataList = this.dataList;
        }
      });
    }
    let arr1 =
      this.dataList &&
      this.dataList.filter((item) => {
        return item?.checked == true;
      });
    if (arr1.length == this.dataList.length) {
      this.deSelect = false;
      this.tdChecked = true;
    } else if (arr1.length > 0) {
      this.deSelect = true;
      this.tdChecked = false;
    } else {
      this.deSelect = false;
      this.tdChecked = false;
    }
  }
}

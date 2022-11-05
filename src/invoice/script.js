const $btnPrint = document.querySelector('#btnPrint');
$btnPrint.addEventListener('click', () => {
  // var prtContent = document.getElementById('main');
  // var WinPrint = window.open(
  //   '',
  //   '',
  //   'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0'
  // );
  // WinPrint.document.write(prtContent.innerHTML);
  // WinPrint.document.close();
  // WinPrint.focus();
  // WinPrint.print();
  // WinPrint.close();
  window.print();
});

function closePrint() {
  document.body.removeChild(this.__container__);
}

function setPrint() {
  this.contentWindow.__container__ = this;
  this.contentWindow.onbeforeunload = closePrint;
  this.contentWindow.onafterprint = closePrint;
  this.contentWindow.focus(); // Required for IE
  this.contentWindow.print();
}

function printPage() {
  const hideFrame = document.createElement('iframe');
  hideFrame.onload = setPrint;
  hideFrame.style.position = 'fixed';
  hideFrame.style.right = '0';
  hideFrame.style.bottom = '0';
  hideFrame.style.width = '0';
  hideFrame.style.height = '0';
  hideFrame.style.border = '0';

  document.body.appendChild(hideFrame);
}

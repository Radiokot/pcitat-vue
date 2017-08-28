export default function (p) {
    toastr[p.mode ? p.mode : 'info'](p.text ? p.text : '', p.title ? p.title : '', {
        'closeButton': false,
        'debug': false,
        'newestOnTop': false,
        'progressBar': false,
        'positionClass': 'toast-top-center',
        'preventDuplicates': false,
        'onclick': null,
        'showDuration': '300',
        'hideDuration': '300',
        'timeOut': p.duration ? p.duration : '2000',
        'extendedTimeOut': '300',
        'showEasing': 'swing',
        'hideEasing': 'linear',
        'showMethod': 'fadeIn',
        'hideMethod': 'fadeOut',
        'positionClass' : 'toast-top-center'
    })
}

(function($) {
  showSwal = function(type) {
    'use strict';
    if (type === 'warning-message-and-cancel') {
      var name = $('#name').val();
      var surname = $('#surname').val();
      var birthday = $('#birthday').val();
      var documentType = $('#documentType').val();
      var documentoNumber = $('#documentoNumber').val();
      var phoneNumber = $('#phoneCode').val() + $('#phoneNumber').val();
      var outputmessage = '• Nome: ' + name + '\n• Apelido: ' +  surname + '\n• Data de Nascimento: ' +  birthday + '\n• Tipo de documento: ' +  documentType + '\n• Número do documento: ' +  documentoNumber + '\n• Número de telefone: ' +  phoneNumber;
      swal({
        title: 'Sr(a). ' + name + ', confirma todos os dados antes de submeter?',
        text: outputmessage,
        showCancelButton: true,
        confirmButtonColor: '#3f51b5',
        cancelButtonColor: '#ff4081',
        confirmButtonText: 'Great ',
        buttons: {
          cancel: {
            text: 'Não',
            value: null,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true,
          },
          confirm: {
            text: 'Sim',
            value: true,
            visible: true,
            className: 'btn btn-primary confirmed_submission',
            closeModal: true
          }
        }
      });
    }else if (type === 'success-message') {
      swal({
        title: 'Obrigado!',
        text: 'O teu registo foi feito com sucesso',
        icon: 'success',
        button: {
          text: "Fechar",
          value: true,
          visible: true,
          className: "btn btn-primary"
        }
      })

    }else if (type === 'error-message') {
      swal({
        title: 'Ocorreu um erro!',
        text: 'Por favor, tenta novamente mais tarde',
        icon: 'error',
        button: {
          text: "Fechar",
          value: true,
          visible: true,
          className: "btn btn-primary"
        }
      })

    }
  }

})(jQuery);
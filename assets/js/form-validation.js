(function($) {
  'use strict';

  $(function() {
    // validate the comment form when it is submitted
    $('#commentForm').validate({
      errorPlacement: function(label, element) {
        label.addClass('mt-2 text-danger');
        label.insertAfter(element);
      },
      highlight: function(element, errorClass) {
        $(element).parent().addClass('has-danger');
        $(element).addClass('form-control-danger');
      }
    });

    $.validator.addMethod('valueNotEquals', function(value, element, arg){
      // I use element.value instead value here, value parameter was always null
      return arg !== element.value;
    }, 'Value must not equal arg.');

    $.validator.addMethod('voda', function(value, element) {
      //84 ou 85
      return this.optional(element) || /\8[4,5]{1}/.test(value);
    }, '');

    $.validator.addMethod('documentoValid', function(value, element) {
      var documentType = $('#documentType').val();
      if (documentType == 'BI'){
        if (value.length == 13) {
          //123456789123A
          return this.optional(element) || /[0-9]{12}[A-Za-z]{1}/.test(value);
        }else {
          return false;
        }
      }else if (documentType == 'Carta de Condução'){
        if (value.length == 8) {
          //12345678
          return this.optional(element) || /[0-9]{8}/.test(value);
        }else if (value.length == 10) {
          //12345678/1
          return this.optional(element) || /[0-9]{8}\/[1-9]{1}/.test(value);
        }
      }else if (documentType == 'Passaporte'){
        if (value.length == 9) {
          //12AB34567
          return this.optional(element) || /[0-9]{2}[A-Za-z]{2}[0-9]{5}/.test(value);
        }else {
          return false;
        }
      }
      console.log(documentType);
      //return this.optional(element) || /\8[4,5]{1}/.test(value);
    }, '');

    $.validator.addMethod('dateformat', function(value, element) {
      // dd/mm/yyyy
      return this.optional(element) || /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(value);
    }, '');

    $.validator.addMethod('mindate', function(value, element) {
      var from = value.split("/");
      var birthdateTimeStamp = new Date(from[2], from[1] - 1, from[0]);
      var cur = new Date();
      var diff = cur - birthdateTimeStamp;
      // This is the difference in milliseconds
      var currentAge = Math.floor(diff/31557600000);

      if (currentAge >= 16){
        return true;
      } else {
        return false;
      }
    }, '');

    // validate signup form on keyup and submit
    $('#applicationForm').validate({
      onsubmit: false,
      submitHandler: function(form) {
        //alert('Qsa');
        if ($(form).valid())
        {
          form.submit();
        }
        return false; // prevent normal form posting
      },
      rules: {
        name: {
          required: true,
          minlength: 3
        },
        surname: {
          required: true,
          minlength: 3
        },
        birthday: {
          required: true,
          dateformat: true,
          mindate: true
        },
        documentoNumber: {
          required: true,
          documentoValid: true,
        },
        phoneNumber: {
          required: true,
          voda: true,
          minlength: 9,
          maxlength: 9,
        }
      },
      messages: {
        name: {
          required: 'Por favor insira o nome',
          minlength: 'O nome deve consistir de pelo menos três caracteres'
        },
        surname: {
          required: 'Por favor insira o apelido',
          minlength: 'O apelido deve consistir de pelo menos três caracteres'
        },
        birthday: {
          required: 'Por favor insira a data de nascimento',
          dateformat: 'Por favor, insira a data no formato dd/mm/yyyy',
          mindate: 'A idade do cliente não pode ser inferior a 16 anos'
        },
        documentoNumber: {
          required: 'Por favor insira o número do documento',
          documentoValid: 'Por favor insira um número correspondente ao tipo do documento',
        },
        phoneNumber: {
          required: 'Por favor insira o número de telefone',
          voda: 'Apenas são permitidos números da operadora Vodacom',
          minlength: 'O número deve consistir de 9 caracteres',
          maxlength: 'O número deve consistir de 9 caracteres'
        }
      },
      errorPlacement: function(label, element) {
        label.addClass('mt-2 text-danger');
        //label.insertAfter(element);
        if (element.hasClass('select2-hidden-accessible')){
          label.insertAfter(element.next('.select2-container'));
        }else if(element.hasClass('file-upload-default')){
          label.insertAfter(element.next('.input-group'));
        }else {
          label.insertAfter(element);
        }
      },
      highlight: function(element, errorClass) {
        $(element).parent().addClass('has-danger');
        $(element).addClass('form-control-danger');
        $(element).parent().find('.select2-selection--multiple').css('border-color', '#ff5e5e');
        $(element).parent().find('#phoneNumber').css('border-color', '#ff5e5e');
      },
      unhighlight: function(element, errorClass) {
        $(element).parent().removeClass('has-danger');
        $(element).removeClass('form-control-danger');
        $(element).parent().find('.select2-selection--multiple').removeAttr( 'style' );
        $(element).parent().find('#phoneNumber').css('border-color', '');
      }
    });

    $('form#applicationForm select').change(function(){
      $(this).valid();
      var optionSelected = $('option:selected', this).val();
      if (optionSelected === '0') {
        $(this).closest('.form-group').find('input').css('display', 'flex').next('.error');
      }else {
        $(this).closest('.form-group').find('input').css('display', 'none').val('').next('.error').css('display', 'none');
      }
      var documentoNumber = $('#documentoNumber').val();
      if (documentoNumber != ''){
        $('#documentoNumber').valid();
      }
    });

      $('#applicationForm').on('click','#submitForm' , function(){
        if ($('#applicationForm').valid()) {
          showSwal('warning-message-and-cancel');
        }
      });

  });
})(jQuery);
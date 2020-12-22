$(document).ready(function () {
    $("body").on("click", ".confirmed_submission", function (ev) {
        //$('#applicationForm').submit();
        var name = $('#name').val();
        var surname = $('#surname').val();
        var birthday = $('#birthday').val();
        var documentType = $('#documentType').val();
        var documentoNumber = $('#documentoNumber').val();
        var phoneNumber = $('#phoneCode').val() + $('#phoneNumber').val();

        var data = {
            input_name: name,
            input_surname: surname,
            input_dob: birthday,
            input_docType: documentType,
            input_docNumber: documentoNumber,
            input_phone: phoneNumber
        };

        $.ajax({
            url: 'http://some.mock.api/create',
            type: 'POST',
            headers: {"x-api-key" : "someRandomKey"},
            data: data,
            dataType: "JSON",
            success: function(data) {
                //alert('Success');
                showSwal('success-message');
                $('#applicationForm')[0].reset();
            },
            error: function(xhr, textStatus, error) {
                //alert('Failure');
                showSwal('error-message');
            }
        });
    });
});
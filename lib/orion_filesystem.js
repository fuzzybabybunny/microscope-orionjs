/**
 * Official S3 Upload Provider
 * 
 * Please replace this function with the 
 * provider you prefer.
 *
 * If success, call success(publicUrl);
 * you can pass data and it will be saved in file.meta
 * Ej: success(publicUrl, {local_path: '/user/path/to/file'})
 *
 * If it fails, call failure(error).
 *
 * When the progress change, call progress(newProgress)
 */
orion.filesystem.providerUpload = function(options, success, failure, progress) {
  S3.upload({
    files: options.fileList,
    path: 'orionjs',
  }, function(error, result) {
    debugger
    if (error) {
      failure(error);
    } else {
      success(result.secure_url, { s3Path: result.relative_url });
      result;
      debugger
    }
    S3.collection.remove({})
  });
  Tracker.autorun(function () {
    var file = S3.collection.findOne();
    if (file) {
      progress(file.percent_uploaded);
    }
  });
};

/**
 * Official S3 Remove Provider
 * 
 * Please replace this function with the 
 * provider you prefer.
 *
 * If success, call success();
 * If it fails, call failure(error).
 */
orion.filesystem.providerRemove = function(file, success, failure)  {
  S3.delete(file.meta.s3Path, function(error, result) {
    if (error) {
      failure(error);
    } else {
      success();
    }
  })
};
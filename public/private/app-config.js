window["appConfig"] = {
    lex: {
      botName: "retailbot",
      botAlias: "DevBot",
      initialText: 'You can ask me for help. Just type "Hi" or click on the mic and say it.',
      initialSpeechInstruction: "Say 'Hi' to get started.",
      reInitSessionAttributesOnRestart: false,
      region: "us-west-2",
    },
    cognito: {
      identityPoolId: "us-west-2:b16e0553-0ce7-4881-9917-d1cd4761c9a4",
      UserPoolId: "us-west-2_uixdOAJZj",
      ClientId: "47d8mfv8vdach3qkojumgrhhl1",
      region: "us-west-2",
    },
    s3: {
      albumBucketName: "dummy",
      uploadPath: "dummy",
      retrievePath: "dummy",
      bucketRegion: "dummy",
      bucketVersionNumber: "dummy",
    },
    polly: {
      voiceId: "Salli",
    },
    recorder: {
      preset: "speech_recognition",
    },
    app: {
      welcomeMessage: "Welcome to SleekBuys. To get Started, Say “Hi” or “Hello”",
      isFileExplorerEnabled: true,
      maxFileUploadCount: 20,
      maxFileUploadSizeInKb: 1,
      sessionTimeOutInMinutes: 60,
      sessionTimeOutMessage: "Your session is about to expire. What would you like to do?",
      forceLogoutAfterTimeOutInMinutes: 1,
      fileUploadPendingMessage:
        "We are currently processing your files, please continue with your old files in the mean time",
      fileUploadSuccessMessage: "Your file has been successfully uploaded",
      surveyUrl: "https://sleekbuys.com/",
    },
  };
  
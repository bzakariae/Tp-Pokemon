package com.example.vibration;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import android.os.Vibrator;
import android.content.Context;

public class AdvancedVibration extends CordovaPlugin {
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if ("vibratePattern".equals(action)) {
            JSONArray arr = args.getJSONArray(0);
            long[] pattern = new long[arr.length()];
            for (int i = 0; i < arr.length(); i++) {
                pattern[i] = arr.getLong(i);
            }
            Vibrator vibrator = (Vibrator) this.cordova.getActivity().getSystemService(Context.VIBRATOR_SERVICE);
            if (vibrator != null) vibrator.vibrate(pattern, -1);
            callbackContext.success();
            return true;
        }
        return false;
    }
}

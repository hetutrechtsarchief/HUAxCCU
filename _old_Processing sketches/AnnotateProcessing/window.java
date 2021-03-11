/**
 * Name:      WindowJS
 * Version:   1.2.2
 * Language:  Java 6
 *
 * Author:    GoToLoop
 * Date:      2015/Sep/15
 * License:   LGPL 2.1
 */

// https://Gist.GitHub.com/GoToLoop/8017bc38b8c8e0a5b70b

//package js; // Uncomment "package js;" for ".java" and comment out for ".pde".

import static javax.swing.JOptionPane.*;
import java.lang.reflect.Array;

//static // Uncomment "static" for ".pde" and comment out for ".java".
public abstract class window {
  public static final window self = new window() {}, window = self, top = self;
  public static final Object undefined = null;
  public static final float NaN = Float.NaN;
  public static final float Infinity = Float.POSITIVE_INFINITY;
  public static String name = "";

  public static final Object alert() {
    return alert(null);
  }

  public static final Object alert(final Object msg) {
    showMessageDialog(null, msg);
    return null;
  }

  public static final boolean confirm() {
    return confirm(null);
  }

  public static final boolean confirm(final Object msg) {
    return showConfirmDialog(null, msg, "Confirm?", OK_CANCEL_OPTION)
      == OK_OPTION;
  }

  public static final String prompt() {
    return prompt(null);
  }

  public static final String prompt(final Object msg) {
    return showInputDialog(msg);
  }

  public static final String prompt(final Object msg, final Object val) {
    return showInputDialog(msg, val);
  }

  public static final boolean isNaN() {
    return true;
  }

  public static final boolean isNaN(final long val) {
    return false;
  }

  public static final boolean isNaN(final double val) {
    return val != val;
  }

  public static final boolean isNaN(final Object o) {
    if (o == null | o instanceof java.util.Date |
      o instanceof Boolean | o instanceof Character)  return false;

    if (o instanceof Number)  return isNaN(((Number) o).doubleValue());

    if (o.getClass().isArray()) {
      int len = Array.getLength(o);
      return len == 0? false : len > 1? true : isNaN(Array.get(o, 0));
    }

    final String s = o.toString().trim();
    if (s.isEmpty())  return false;

    try {
      return isNaN(Double.parseDouble(s));
    } 
    catch (final NumberFormatException e) {
      return true;
    }
  }

  public static final boolean isFinite() {
    return false;
  }

  public static final boolean isFinite(final long val) {
    return true;
  }

  public static final boolean isFinite(final double val) {
    return val != -Infinity & val != Infinity & val == val;
  }

  public static final boolean isFinite(final Object o) {
    if (o == null | o instanceof java.util.Date |
        o instanceof Boolean | o instanceof Character)  return true;

    if (o instanceof Number)  return isFinite(((Number) o).doubleValue());

    if (o.getClass().isArray()) {
      final int len = Array.getLength(o);
      return len == 0? true : len > 1? false : isFinite(Array.get(o, 0));
    }

    final String s = o.toString().trim();
    if (s.isEmpty())  return true;

    try {
      return isFinite(Double.parseDouble(s));
    } 
    catch (final NumberFormatException e) {
      return false;
    }
  }

  public static final String Date() {
    return new java.util.Date().toString();
  }

  public static final class Date extends java.util.Date {
    public static final long now() {
      return new java.util.Date().getTime();
    }
  }

  public static final Object[] Array(final int len) {
    return new Object[len];
  }

  @SafeVarargs public static final <T> T[] Array(final T... arr) {
    return arr == null? (T[]) new Object[0] : arr;
  }
}

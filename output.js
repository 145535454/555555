//Sat Nov 23 2024 15:56:34 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const configPath = path.join(__dirname, "ql_custom_env_vars.json");
const userPointsPath = path.join(__dirname, "user_points.json");
const userSignInPath = path.join(__dirname, "user_sign_in.json");
function readCustomEnvVars() {
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath, "utf8"));
  }
  return {};
}
function saveCustomEnvVars(_0x35616c) {
  fs.writeFileSync(configPath, JSON.stringify(_0x35616c, null, 2));
}
function readUserPoints() {
  if (fs.existsSync(userPointsPath)) {
    return JSON.parse(fs.readFileSync(userPointsPath, "utf8"));
  }
  return {};
}
function saveUserPoints(_0x3cb34a) {
  fs.writeFileSync(userPointsPath, JSON.stringify(_0x3cb34a, null, 2));
}
function readUserSignIn() {
  if (fs.existsSync(userSignInPath)) {
    return JSON.parse(fs.readFileSync(userSignInPath, "utf8"));
  }
  return {};
}
function saveUserSignIn(_0x4fa91a) {
  fs.writeFileSync(userSignInPath, JSON.stringify(_0x4fa91a, null, 2));
}
let customEnvVars = readCustomEnvVars();
let userPoints = readUserPoints();
let userSignIn = readUserSignIn();
const qlConfigSchema = BncrCreateSchema.object({
  baseUrl: BncrCreateSchema.string().setTitle("青龙面板地址").setDescription("设置青龙面板的访问地址"),
  clientId: BncrCreateSchema.string().setTitle("Client ID").setDescription("设置青龙面板的 Client ID"),
  clientSecret: BncrCreateSchema.string().setTitle("Client Secret").setDescription("设置青龙面板的 Client Secret")
});
const QlConfigDB = new BncrPluginConfig(qlConfigSchema);
module.exports = async _0x3c7a2f => {
  let _0x27e5e5 = _0x3c7a2f;
  const _0x3947ec = _0x27e5e5.param(1);
  const _0xbc5021 = _0x27e5e5.param(2);
  const _0x202307 = await _0x27e5e5.isAdmin();
  const _0x3e0acc = _0x27e5e5.getUserId();
  if (_0x3947ec === "设置青龙") {
    if (!_0x202307) {
      return await _0x27e5e5.reply("只有管理员才能设置青龙配置。");
    }
    const [_0x297617, _0x35e28a, _0x2919ac] = _0xbc5021.split(" ").map(_0x3075a9 => _0x3075a9.trim());
    if (!_0x297617 || !_0x35e28a || !_0x2919ac) {
      return await _0x27e5e5.reply("格式错误。正确格式：设置青龙 青龙面板地址 client_id client_secret");
    }
    await QlConfigDB.set({
      baseUrl: _0x297617,
      clientId: _0x35e28a,
      clientSecret: _0x2919ac
    });
    return await _0x27e5e5.reply("青龙配置已更新。");
  } else {
    if (_0x3947ec === "签到") {
      const _0x1b3cbb = new Date().toDateString();
      if (userSignIn[_0x3e0acc] === _0x1b3cbb) {
        return await _0x27e5e5.reply("重复签到");
      }
      const _0x509186 = Math.floor(Math.random() * 10) + 1;
      userPoints[_0x3e0acc] = (userPoints[_0x3e0acc] || 0) + _0x509186;
      userSignIn[_0x3e0acc] = _0x1b3cbb;
      saveUserPoints(userPoints);
      saveUserSignIn(userSignIn);
      return await _0x27e5e5.reply("签到成功已增加" + _0x509186 + "积分，你现有" + userPoints[_0x3e0acc] + "积分");
    } else {
      if (_0x3947ec === "设置环境变量") {
        if (!_0x202307) {
          return await _0x27e5e5.reply("只有管理员才能设置环境变量。");
        }
        const _0x1cf2eb = _0xbc5021.split(" ").map(_0x1ceb22 => _0x1ceb22.trim());
        let _0x4cd9c2, _0x98cc3a, _0xa87466, _0x3fea65;
        if (_0x1cf2eb.length === 3) {
          [_0x4cd9c2, _0x98cc3a, _0x3fea65] = _0x1cf2eb;
          _0xa87466 = "";
        } else {
          if (_0x1cf2eb.length === 4) {
            [_0x4cd9c2, _0x98cc3a, _0xa87466, _0x3fea65] = _0x1cf2eb;
          } else {
            return await _0x27e5e5.reply("格式错误。正确格式：设置环境变量 变量名 关键字 [分隔符] 所需积分");
          }
        }
        if (!_0x4cd9c2 || !_0x98cc3a || isNaN(parseInt(_0x3fea65))) {
          return await _0x27e5e5.reply("格式错误。请确保提供了变量名、关键字和有效的积分数。");
        }
        customEnvVars[_0x98cc3a] = {
          name: _0x4cd9c2,
          separator: _0xa87466,
          points: parseInt(_0x3fea65)
        };
        saveCustomEnvVars(customEnvVars);
        return await _0x27e5e5.reply("环境变量 " + _0x4cd9c2 + " 已设置，关键字为 " + _0x98cc3a + "，分隔符为 " + (_0xa87466 || "无") + "，所需积分为 " + _0x3fea65);
      } else {
        if (_0x3947ec === "查看环境变量") {
          if (!_0x202307) {
            return await _0x27e5e5.reply("只有管理员才能查看环境变量。");
          }
          const _0x2a1529 = Object.entries(customEnvVars).map(([_0x27aeb8, {
            name,
            separator,
            points
          }]) => "关键字: " + _0x27aeb8 + ", 变量名: " + name + ", 分隔符: " + (separator || "无") + ", 所需积分: " + points).join("\n");
          return await _0x27e5e5.reply("当前设置的环境变量:\n" + (_0x2a1529 || "暂无环境变量"));
        } else {
          if (_0x3947ec === "删除环境变量") {
            if (!_0x202307) {
              return await _0x27e5e5.reply("只有管理员才能删除环境变量。");
            }
            if (!_0xbc5021) {
              return await _0x27e5e5.reply("请输入要删除的环境变量关键字。");
            }
            if (customEnvVars[_0xbc5021]) {
              delete customEnvVars[_0xbc5021];
              saveCustomEnvVars(customEnvVars);
              return await _0x27e5e5.reply("环境变量 " + _0xbc5021 + " 已删除。");
            } else {
              return await _0x27e5e5.reply("未找到关键字为 " + _0xbc5021 + " 的环境变量。");
            }
          } else {
            if (_0x3947ec === "添加积分") {
              if (!_0x202307) {
                return await _0x27e5e5.reply("只有管理员才能添加积分。");
              }
              const [_0x399d42, _0x314f7a] = _0xbc5021.split(" ").map(_0x1e4a0b => _0x1e4a0b.trim());
              if (!_0x399d42 || !_0x314f7a) {
                return await _0x27e5e5.reply("格式错误。正确格式：添加积分 用户ID 积分数");
              }
              userPoints[_0x399d42] = (userPoints[_0x399d42] || 0) + parseInt(_0x314f7a);
              saveUserPoints(userPoints);
              return await _0x27e5e5.reply("已为用户 " + _0x399d42 + " 添加 " + _0x314f7a + " 积分，当前积分为 " + userPoints[_0x399d42]);
            } else {
              if (_0x3947ec === "查看积分") {
                const _0x285f36 = userPoints[_0x3e0acc] || 0;
                return await _0x27e5e5.reply("您当前的积分为: " + _0x285f36);
              } else {
                if (customEnvVars[_0x3947ec]) {
                  const {
                    name: _0x3472e8,
                    separator,
                    points: _0x32a6b3
                  } = customEnvVars[_0x3947ec];
                  const _0x297426 = userPoints[_0x3e0acc] || 0;
                  if (_0x297426 < _0x32a6b3) {
                    return await _0x27e5e5.reply("您的积分不足，无法执行此操作。当前积分: " + _0x297426 + "，所需积分: " + _0x32a6b3);
                  }
                  await _0x27e5e5.reply("请上传变量 " + _0x3472e8 + " 的变量值");
                  const _0x41a464 = await _0x27e5e5.waitInput(() => {}, 60);
                  if (_0x41a464) {
                    const _0x460785 = _0x41a464.getMsg().trim();
                    await QlConfigDB.get();
                    if (!Object.keys(QlConfigDB.userConfig).length) {
                      return await _0x27e5e5.reply("请先使用\"设置青龙\"命令配置青龙面板信息。");
                    }
                    const _0x1b94b0 = await uploadVariable(_0x27e5e5, QlConfigDB.userConfig, _0x3472e8, _0x460785, "", separator);
                    if (_0x1b94b0) {
                      userPoints[_0x3e0acc] -= _0x32a6b3;
                      saveUserPoints(userPoints);
                      await _0x27e5e5.reply("上传成功！已扣除 " + _0x32a6b3 + " 积分，当前剩余积分: " + userPoints[_0x3e0acc]);
                    }
                  } else {
                    await _0x27e5e5.reply("未收到输入，操作取消");
                  }
                } else {
                  if (_0x3947ec === "上传变量") {
                    await QlConfigDB.get();
                    if (!Object.keys(QlConfigDB.userConfig).length) {
                      return await _0x27e5e5.reply("请先使用\"设置青龙\"命令配置青龙面板信息。");
                    }
                    if (!_0xbc5021) {
                      return await _0x27e5e5.reply("请输入要上传的变量，格式：名称=值 备注");
                    }
                    const [_0x4d6350, _0x304537] = _0xbc5021.split(" ").map(_0x42d0a6 => _0x42d0a6.trim());
                    const [_0x3ab997, _0x560bca] = _0x4d6350.split("=").map(_0x17b851 => _0x17b851.trim());
                    if (!_0x3ab997 || !_0x560bca) {
                      return await _0x27e5e5.reply("变量格式不正确，请使用 名称=值 备注 的格式");
                    }
                    await uploadVariable(_0x27e5e5, QlConfigDB.userConfig, _0x3ab997, _0x560bca, _0x304537);
                  } else {
                    return false;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return true;
};
async function uploadVariable(_0x29eade, _0x581d9d, _0x39b82e, _0x36b419, _0x2ed214 = "", _0x1fa890 = "") {
  try {
    console.log("开始上传变量: 名称=" + _0x39b82e + ", 备注=" + _0x2ed214 + ", 分隔符=" + _0x1fa890);
    console.log("正在获取访问令牌...");
    const _0x4e576b = await axios.get(_0x581d9d.baseUrl + "/open/auth/token", {
      params: {
        client_id: _0x581d9d.clientId,
        client_secret: _0x581d9d.clientSecret
      }
    });
    if (_0x4e576b.data.code !== 200 || !_0x4e576b.data.data || !_0x4e576b.data.data.token) {
      throw new Error("获取访问令牌失败：响应中没有找到token");
    }
    const _0x5ebbf6 = _0x4e576b.data.data.token;
    console.log("成功获取访问令牌");
    console.log("正在检查变量是否存在...");
    const _0x19145e = await axios.get(_0x581d9d.baseUrl + "/open/envs", {
      headers: {
        Authorization: "Bearer " + _0x5ebbf6
      }
    });
    const _0x5d6f3f = _0x19145e.data.data.filter(_0x47db1c => _0x47db1c.name === _0x39b82e);
    console.log("找到 " + _0x5d6f3f.length + " 个同名变量");
    let _0x1efe2b;
    if (_0x5d6f3f.length > 0 && _0x1fa890) {
      console.log("正在更新所有同名变量...");
      const _0x593677 = _0x5d6f3f.map(_0x5383b3 => {
        const _0x1d7f87 = "" + _0x5383b3.value + _0x1fa890 + _0x36b419;
        console.log("更新变量: ID=" + _0x5383b3.id);
        return axios.put(_0x581d9d.baseUrl + "/open/envs", {
          id: _0x5383b3.id,
          value: _0x1d7f87,
          name: _0x39b82e,
          remarks: _0x2ed214 || _0x5383b3.remarks || ""
        }, {
          headers: {
            Authorization: "Bearer " + _0x5ebbf6,
            "Content-Type": "application/json"
          }
        });
      });
      _0x1efe2b = await Promise.all(_0x593677);
    } else {
      console.log("正在添加新变量...");
      _0x1efe2b = await axios.post(_0x581d9d.baseUrl + "/open/envs", [{
        value: _0x36b419,
        name: _0x39b82e,
        remarks: _0x2ed214 || ""
      }], {
        headers: {
          Authorization: "Bearer " + _0x5ebbf6,
          "Content-Type": "application/json"
        }
      });
    }
    console.log("上传变量响应状态码:", Array.isArray(_0x1efe2b) ? _0x1efe2b.map(_0x2bd664 => _0x2bd664.status) : _0x1efe2b.status);
    if (Array.isArray(_0x1efe2b) ? _0x1efe2b.every(_0x547d18 => _0x547d18.data.code === 200) : _0x1efe2b.data.code === 200) {
      const _0x481d34 = _0x5d6f3f.length > 0 && _0x1fa890 ? "更新" : "添加";
      await _0x29eade.reply(_0x481d34 + "成功！\n变量名：" + _0x39b82e + "\n备注：" + (_0x2ed214 || "无") + "\n\n变量值已成功" + _0x481d34 + "，但出于安全考虑不在此显示。");
      return true;
    } else {
      throw new Error("操作失败：" + (Array.isArray(_0x1efe2b) ? JSON.stringify(_0x1efe2b.map(_0x118010 => _0x118010.data)) : JSON.stringify(_0x1efe2b.data)));
    }
  } catch (_0xc03aaa) {
    console.error("操作变量失败:", _0xc03aaa.message);
    if (_0xc03aaa.response) {
      console.error("错误响应状态:", _0xc03aaa.response.status);
      console.error("错误响应数据:", JSON.stringify(_0xc03aaa.response.data));
    } else {
      if (_0xc03aaa.request) {
        console.error("未收到响应");
      } else {
        console.error("错误:", _0xc03aaa.message);
      }
    }
    await _0x29eade.reply("操作变量失败。错误信息: " + _0xc03aaa.message);
    return false;
  }
}
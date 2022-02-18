const { SlashCommandBuilder,SlashCommandSubcommandBuilder } = require("@discordjs/builders");
const { initializeApp } = require("firebase/app");
const { firebaseConfig } = require("../config.json");
initializeApp(firebaseConfig);
const { getDatabase, ref, child, get } =require( "firebase/database");

const check = new SlashCommandSubcommandBuilder() 
check.setName("check-all").setDescription("kiểm tra tất cả");

const checkDevices = new SlashCommandSubcommandBuilder()
checkDevices
  .setName("check-devices")
  .setDescription("Kiểm tra trạng thái các thiết bị")
  .addStringOption(
    op => op
      .setName("name")
      .setDescription("Tên thiết bị cần kiểm tra")
  )

const checkSensors = new SlashCommandSubcommandBuilder();
checkSensors
  .setName("check-sensors")
  .setDescription("Kiểm tra thông số cảm biến")
  .addStringOption((op) =>
    op.setName("name").setDescription("Tên cảm biến")
  );





const dbRef = ref(getDatabase());
  
module.exports = {
  data: new SlashCommandBuilder().setName("iot")
    .setDescription("Call IOT Bot")
    .addSubcommand(check)
    .addSubcommand(checkDevices)
    .addSubcommand(checkSensors)
  ,
  async execute(inter) {
    const op=inter.options
    switch (op.getSubcommand()) {
      case "check-all": {
        await inter.reply("Ok, Checking...");
        
        break
      }
      case "check-devices": {
        await inter.reply(`OK, Checking ${op.getString('name')}...`);
        const snap = await get(child(dbRef, `devices/${op.getString("name")}`))
        if (snap.exists()) {
          inter.channel.send(`${op.getString("name")} is ${snap.val()}`);
        } else {
          inter.channel.send("Can't find device")
        }
        break
      }
      case "check-sensors": {
        await inter.reply(`OK, Checking ${op.getString('name')} sensor...`);
        const snap = await get(child(dbRef, `sensor/${op.getString("name")}`))
        if (snap.exists()) {
          inter.channel.send(`${op.getString("name")} is ${snap.val()}`);
        } else {
          inter.channel.send("Can't find sensor")
        }
        break
      }
      default: {
        await inter.reply("I'm Here, Sir");
        break
      }
    }

  },
};  

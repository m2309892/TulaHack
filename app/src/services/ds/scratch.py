# !pip install catboost --quiet

from catboost import CatBoostRegressor
import numpy as np
from datetime import datetime, timedelta


# есть словарь с параметрами одного растения. Составим для него предсказание и совет
plant_info = {
    "plant_type": "тюльпаны",
    "soil_type": "песчаная",
    "location": "теплица",
    "acidity_soil_type": "нейтральные",
    "watering_frequency": 10,  # поливать каждые 10 дней.
    "last_watering": "2024-04-25",

    "fertilization_frequency": 5,  # удобрять каждые n дней
    "last_fertilizer": "2024-04-17",  # послед. удобрение

    "spraying_frequency": 7,  # опрыскивать каждые n дней
    "last_spraying": "2024-04-27",  # послед. опрыскивание

    "temperature": 26

    # "disease_probability": 0.2 # уменьшать на 0.1 процентов при удобрениии.
    #                             # повышать на 0.05 спустя неделю без удобрения
}


def start_catboost():
    model_watering = CatBoostRegressor()
    model_watering.load_model('/content/catboost_model_watering')

    model_fertilization = CatBoostRegressor()
    model_fertilization.load_model('/content/catboost_model_fertilization')

    model_spraying = CatBoostRegressor()
    model_spraying.load_model('/content/catboost_model_spraying')


def days_since_last_Ving(last_data):
    last_Ving_datetime = datetime.strptime(last_data, "%Y-%m-%d")
    current_datetime = datetime.now()
    delta = current_datetime - last_Ving_datetime
    return delta.days

    # по api получаем дату когда был последний дождь


def main_analisys(**plant_info):
    days_since_last_watering = days_since_last_Ving(plant_info["last_watering"])
    days_since_last_fertilizer = days_since_last_Ving(plant_info["last_fertilizer"])
    days_since_last_spraying = days_since_last_Ving(plant_info["last_spraying"])

    start_catboost()

    plant_type = plant_info['plant_type']
    final_promt = ""

    days_watering = abs(datetime.strptime(plant_info["last_watering"], "%Y-%m-%d") + timedelta(
        days=plant_info["watering_frequency"]) - datetime.now()).days
    days_fertilization = abs(datetime.strptime(plant_info["last_fertilizer"], "%Y-%m-%d") + timedelta(
        days=plant_info["fertilization_frequency"]) - datetime.now()).days
    days_spraying = abs(datetime.strptime(plant_info["last_spraying"], "%Y-%m-%d") + timedelta(
        days=plant_info["spraying_frequency"]) - datetime.now()).days

    promt_watering = {
        0: f"Необходимо полить {plant_type}. Большинство растений не любят полив по листьям, это приводит к распространению грибных болезней, так что поливайте под корень. ",
        1: f"Рекомендуем полить {plant_type} через {days_watering} дней. Для полива годится прудовая, речная, озерная и, конечно, дождевая. Главное, чтобы вода для полива была химически чистой (без примесей солей и хлора). ",
        2: f"Пора полить {plant_type}. Советуем Вам при поливе, добавить в воду средство 'Росток'. Препарат стимулирует рост и развитие растений. ",
        3: f"Рекомендуем полить {plant_type} через {days_watering} дней. Поливайте водой примерной температуры 15-25°C. Слишком холодная или горячая вода повредит стеблям и корням. ",
        4: f"Пора полить {plant_type}. При похолодании поливать стоит утром или в середине дня. Чрезмерный вечерний полив не позволит впитаться влаге в почву, и излишняя сырость может вызвать распространение грибковых болезней. ",
        5: f"Рекомендуем полить {plant_type} через {days_watering} дней. Поливайте водой примерной температуры 18-25°C. Слишком холодная или горячая вода повредит стеблям и корням. "
    }

    promt_fertilization = {

        0: f"Кислотность вашей почвы повышенная, рекомендуем использовать 'Раскислитель почвы КальцеГарден'. ",
        1: f"Рекомендуем добавить удобрение в почву через {days_fertilization} дней. ",
        2: f"Подкармливайте растения удобрениями с учетом их фаз роста для поддержания здорового развития.",
        3: f"Необходимо добавить удобрение в почву через {days_fertilization} дней. Обеспечьте своим растениям достаточное освещение в зависимости от их видов и потребностей. ",
        4: f"Настало время добавить удобрение. Рекомендуется использовать удобрение с высоким содержанием органических веществ для улучшения плодородия почвы. ",
        5: f"Необходимо добавить удобрение в почву через {days_fertilization} дней. Регулярно проверяйте почву на влажность, чтобы поддерживать оптимальный уровень полива для каждого растения. "
    }

    promt_spraying = {
        0: f"Для растений рекомендуется проводить опрыскивание функциадами, для борьбы с вредителями.",
        1: f"Ваше растение может требовать опрыскивания средствами для удобрения или защиты от вредителей через {days_spraying} дней. Продолжайте ухаживать за ним согласно его потребностям.",
        2: f"Для поддержания здоровья растения {plant_type} в почвах, регулярно проводите опрыскивание удобрениями или защитными средствами в соответствии с их фазами роста и требованиями.",
        3: f"Растения в данных почвах потребуют опрыскивания удобрениями или защитными средствами через {days_spraying} дней. Обеспечьте им достаточное освещение и уход.",
        4: f"Для растений рекомендуется проводить опрыскивание с использованием удобрений или средств для улучшения плодородия почвы.",
        5: f"Ваши растения требуют опрыскивания средствами для удобрения или защиты от вредителей через {days_spraying} дней. Регулярно проверяйте их состояние и обеспечивайте оптимальные условия ухода."
    }

    data = {
        'soil_type': [plant_info['soil_type']],
        'acidity_soil_type': [plant_info['acidity_soil_type']],
        'location': [plant_info['location']],
        'watering_frequency': [plant_info['watering_frequency']],
        'last_watering': [days_since_last_watering],
        'fertilization_frequency': [plant_info['fertilization_frequency']],
        'last_fertilizer': [days_since_last_fertilizer],
        'spraying_frequency': [plant_info['spraying_frequency']],
        'last_spraying': [days_since_last_spraying],
        'temperature': [plant_info['temperature']]
    }
    df = pd.DataFrame(data)

    # Находим индекс класса с наибольшей вероятностью
    predicted_class_watering = np.argmax(model_watering.predict(df))
    predicted_class_fertilization = np.argmax(model_fertilization.predict(df))
    predicted_class_spraying = np.argmax(model_spraying.predict(df))

    final_promt += promt_watering[predicted_class_watering]
    final_promt += promt_fertilization[predicted_class_fertilization]
    final_promt += promt_spraying[predicted_class_spraying]

    return final_promt



# print(main_analisys(**plant_info))